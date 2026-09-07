import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Drawer,
  List,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  type TableColumnsType,
} from 'antd';
import { useState } from 'react';

import {
  deleteDataset,
  getDatasetHealth,
  listDatasets,
  type PhysicalDataset,
} from '@/api/physicalDatasets';
import { Pill } from '@/components/Pill';
import { formatDateTime } from '@/lib/format';
import { getErrorMessage, notifyError, notifySuccess } from '@/lib/notify';
import { DATASET_STATUS, HEALTH_STATUS, SEVERITY_STATUS, statusView } from '@/lib/status';

import { UploadWizard } from './UploadWizard';

export function PhysicalDatasetsTab({ projectId }: { projectId: number }) {
  const queryClient = useQueryClient();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [healthFor, setHealthFor] = useState<PhysicalDataset | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['datasets', projectId],
    queryFn: () => listDatasets(projectId),
    refetchInterval: (query) =>
      query.state.data?.items.some((d) => d.status === 'validating') ? 2000 : false,
  });

  const deleteMutation = useMutation({
    mutationFn: (datasetId: number) => deleteDataset(projectId, datasetId),
    onSuccess: () => {
      notifySuccess('Датасет удалён');
      void queryClient.invalidateQueries({ queryKey: ['datasets', projectId] });
    },
    onError: (error) => notifyError(getErrorMessage(error)),
  });

  const columns: TableColumnsType<PhysicalDataset> = [
    {
      title: 'Название',
      key: 'name',
      render: (_, dataset) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{dataset.name}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {dataset.file_name}
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Pill tone={statusView(DATASET_STATUS, status).tone}>
          {statusView(DATASET_STATUS, status).label}
        </Pill>
      ),
    },
    {
      title: 'Объём',
      key: 'volume',
      render: (_, dataset) =>
        dataset.status === 'ready' ? (
          <Space size={4} wrap>
            <Tag>событий: {dataset.total_events}</Tag>
            <Tag>кейсов: {dataset.total_cases}</Tag>
            <Tag>операций: {dataset.unique_activities}</Tag>
          </Space>
        ) : (
          '—'
        ),
    },
    {
      title: 'Качество данных',
      key: 'health',
      render: (_, dataset) =>
        dataset.status === 'ready' ? (
          <Button type="link" size="small" onClick={() => setHealthFor(dataset)}>
            <Pill tone={statusView(HEALTH_STATUS, dataset.health_status).tone}>
              {statusView(HEALTH_STATUS, dataset.health_status).label}
            </Pill>
          </Button>
        ) : (
          '—'
        ),
    },
    {
      title: 'Загружен',
      dataIndex: 'uploaded_at',
      key: 'uploaded_at',
      render: (value: string) => formatDateTime(value),
    },
    {
      title: '',
      key: 'actions',
      width: 110,
      render: (_, dataset) => (
        <Popconfirm
          title="Удалить датасет?"
          okText="Удалить"
          cancelText="Отмена"
          onConfirm={() => deleteMutation.mutate(dataset.id)}
        >
          <Button size="small" danger>
            Удалить
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => setWizardOpen(true)}
        >
          Загрузить датасет
        </Button>
      </div>
      <Table
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={data?.items ?? []}
        pagination={{ pageSize: 20, hideOnSinglePage: true }}
      />

      <UploadWizard
        projectId={projectId}
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
      />

      <Drawer
        title={`Качество данных: ${healthFor?.name ?? ''}`}
        open={healthFor != null}
        onClose={() => setHealthFor(null)}
        width={460}
      >
        {healthFor && (
          <HealthReportView projectId={projectId} datasetId={healthFor.id} />
        )}
      </Drawer>
    </div>
  );
}

function HealthReportView({
  projectId,
  datasetId,
}: {
  projectId: number;
  datasetId: number;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ['dataset-health', projectId, datasetId],
    queryFn: () => getDatasetHealth(projectId, datasetId),
  });

  return (
    <List
      loading={isLoading}
      dataSource={data?.checks ?? []}
      locale={{ emptyText: 'Проверки не выполнялись' }}
      renderItem={(check) => (
        <List.Item>
          <List.Item.Meta
            title={
              <Space>
                <Pill tone={statusView(SEVERITY_STATUS, check.severity).tone}>
                  {statusView(SEVERITY_STATUS, check.severity).label}
                </Pill>
                {check.name}
              </Space>
            }
            description={check.message}
          />
        </List.Item>
      )}
    />
  );
}
