import MDEditorWithPreview from '@/components/MDEditorWithPreview/MDEditorWithPreview';
import TaskSubmitCard from '@/components/TaskSubmitCard/TaskSubmitCard';
import { useIntl, useModel } from '@@/exports';
import { FileDoneOutlined } from '@ant-design/icons';
import MDEditor from '@uiw/react-md-editor';
import { Button, Col, Divider, message, Modal, Tabs, Tooltip } from 'antd';
import { MacScrollbar } from 'mac-scrollbar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './TaskModal.less';

interface TaskSubmitColProps {
  visible: boolean;
  onReview: () => void;
}

export default function TaskSubmitCol({
  visible,
  onReview,
}: TaskSubmitColProps) {
  const { formatMessage } = useIntl();
  const { accounts, getTokenAsync } = useModel('walletModel', (model) => ({
    accounts: model.accounts,
    getTokenAsync: model.getTokenAsync,
  }));
  const { chainType, isAuthor } = useModel('storyModel', (model) => ({
    chainType: model.chainType,
    isAuthor: model.isAuthor,
  }));
  const {
    storyTask,
    runCreateTaskSubmit,
    loadingCreateTaskSubmit,
    runRemoveTaskSubmit,
  } = useModel('taskModel', (model) => ({
    storyTask: model.storyTask,
    runCreateTaskSubmit: model.runCreateTaskSubmit,
    loadingCreateTaskSubmit: model.loadingCreateTaskSubmit,
    runRemoveTaskSubmit: model.runRemoveTaskSubmit,
  }));

  const account = accounts[chainType];

  const allListRef = useRef<any>();
  const myListRef = useRef<any>();

  const [content, setContent] = useState('');
  const [viewMoreContent, setViewMoreContent] = useState('');
  const [viewModalVisible, setViewModalVisible] = useState(false);

  useEffect(() => {
    setContent('');
  }, [visible]);

  const approvedSubmits = useMemo(() => {
    if (!storyTask?.submits) return [];
    return storyTask.submits.filter(
      (e: API.StoryTaskSubmit) => e.status === 'Approved',
    );
  }, [storyTask]);

  const rejectedSubmits = useMemo(() => {
    if (!storyTask?.submits) return [];
    return storyTask.submits.filter(
      (e: API.StoryTaskSubmit) => e.status === 'Rejected',
    );
  }, [storyTask]);

  const mySubmits = useMemo(() => {
    if (!account || !storyTask?.submits) return [];
    return storyTask.submits.filter(
      (e: API.StoryTaskSubmit) =>
        e.account.toLowerCase() === account.toLowerCase(),
    );
  }, [account, storyTask]);

  const handleDelete = useCallback(async (id: number | string) => {
    const token = await getTokenAsync(chainType, true);
    await runRemoveTaskSubmit(id, token);
    message.success(formatMessage({ id: 'task-modal.removed' }));
  }, []);

  return (
    <Col flex={'550px'} className={styles.taskSubmitCol}>
      {approvedSubmits.length > 0 && (
        <TaskSubmitCard
          data={approvedSubmits[0]}
          onViewMore={() => {
            setViewMoreContent(approvedSubmits[0].content);
            setViewModalVisible(true);
          }}
          minHeight={300}
          maxHeight={300}
        />
      )}
      <Tabs
        size={'small'}
        // defaultActiveKey={'all'}
        tabBarExtraContent={
          isAuthor &&
          storyTask?.status === 'Todo' && (
            <Tooltip title={formatMessage({ id: 'task-modal.review' })}>
              <Button
                type={'text'}
                icon={<FileDoneOutlined />}
                onClick={onReview}
              />
            </Tooltip>
          )
        }
        style={{
          height:
            storyTask?.status === 'Todo'
              ? 460
              : storyTask?.status === 'Done'
              ? 'calc(100% - 416px)'
              : '100%',
        }}
      >
        <Tabs.TabPane tab={formatMessage({ id: 'task-modal.all' })} key={'all'}>
          <MacScrollbar
            ref={allListRef}
            className={styles.submitList}
            style={
              storyTask?.status === 'Todo'
                ? {
                    height: 406,
                  }
                : {}
            }
          >
            {storyTask && storyTask.submits?.length > 0 ? (
              storyTask.submits.map((submit: API.StoryChainTaskSubmit) => (
                <TaskSubmitCard
                  key={`all-task-${submit.id || submit.chainSubmitId}`}
                  data={submit}
                  removable={
                    submit.account.toLowerCase() === account.toLowerCase() &&
                    storyTask?.status === 'Todo'
                  }
                  onViewMore={() => {
                    setViewMoreContent(submit.content);
                    setViewModalVisible(true);
                  }}
                  onDelete={async () => {
                    await handleDelete(submit.id || submit.chainSubmitId);
                  }}
                />
              ))
            ) : (
              <div className={styles.emptyTip}>
                {formatMessage({ id: 'task-modal.no-submit-tip' })}
              </div>
            )}
          </MacScrollbar>
        </Tabs.TabPane>
        <Tabs.TabPane tab={formatMessage({ id: 'task-modal.my' })} key={'my'}>
          <MacScrollbar ref={myListRef} className={styles.submitList}>
            {mySubmits.length > 0 ? (
              mySubmits.map((submit: API.StoryChainTaskSubmit) => (
                <TaskSubmitCard
                  key={`my-task-${submit.id || submit.chainSubmitId}`}
                  data={submit}
                  removable={storyTask?.status === 'Todo'}
                  onViewMore={() => {
                    setViewMoreContent(submit.content);
                    setViewModalVisible(true);
                  }}
                  onDelete={async () => {
                    await handleDelete(submit.id);
                  }}
                />
              ))
            ) : (
              <div className={styles.emptyTip}>
                {formatMessage({ id: 'task-modal.no-submit-tip' })}
              </div>
            )}
          </MacScrollbar>
        </Tabs.TabPane>
      </Tabs>
      {storyTask?.status === 'Todo' && (
        <>
          <Divider />
          <MDEditorWithPreview
            disabled={loadingCreateTaskSubmit}
            value={content}
            onChange={(e) => setContent(e)}
            placeholder={formatMessage({
              id: 'task-modal.submit-content.placeholder',
            })}
          />
          <Button
            block={true}
            type={'primary'}
            loading={loadingCreateTaskSubmit}
            onClick={async () => {
              if (!content) return;
              const token = await getTokenAsync(chainType, true);
              await runCreateTaskSubmit(content, token);
              setContent('');
              message.success(formatMessage({ id: 'task-modal.submitted' }));
              allListRef?.current?.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
              myListRef?.current?.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            Submit
          </Button>
        </>
      )}
      <Modal
        centered={true}
        footer={null}
        closable={false}
        width={1000}
        visible={viewModalVisible}
        onCancel={() => {
          setViewMoreContent('');
          setViewModalVisible(false);
        }}
        bodyStyle={{
          padding: '24px 48px',
        }}
      >
        <MDEditor.Markdown source={viewMoreContent} linkTarget={'_blank'} />
      </Modal>
    </Col>
  );
}
