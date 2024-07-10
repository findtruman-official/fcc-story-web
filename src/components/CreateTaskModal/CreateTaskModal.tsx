import MDEditorWithPreview from '@/components/MDEditorWithPreview/MDEditorWithPreview';
import { useIntl } from '@@/exports';
import { Button, Input, InputNumber, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function CreateTaskModal({
  visible,
  onClose,
}: CreateTaskModalProps) {
  const { formatMessage } = useIntl();
  const { reservedNftRest } = useModel('storyModel', (model) => ({
    reservedNftRest: model.reservedNftRest,
  }));
  const { runCreateStoryTask, loadingCreateStoryTask, taskModule } = useModel(
    'taskModel',
    (model) => ({
      runCreateStoryTask: model.runCreateStoryTask,
      loadingCreateStoryTask: model.loadingCreateStoryTask,
      taskModule: model.taskModule,
    }),
  );
  const { getToken } = useModel('walletModel', (model) => ({
    getToken: model.getToken,
  }));
  const { currentStory, balanceOfStoryNft, nfts, refreshNfts, gettingNfts } =
    useModel('storyModel', (model) => ({
      currentStory: model.currentStory,
      balanceOfStoryNft: model.balanceOfStoryNft,
      nfts: model.nfts,
      refreshNfts: model.refreshNfts,
      gettingNfts: model.gettingNfts,
    }));
  const chainType = currentStory?.chainInfo.type;
  const token = getToken(chainType);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [rewards, setRewards] = useState<number[]>([]);
  const [rewardsAmount, setRewardsAmount] = useState(0);

  useEffect(() => {
    setRewards([]);
  }, [currentStory]);

  useEffect(() => {
    if (visible) {
      refreshNfts();
    }
  }, [visible]);

  return (
    <Modal
      centered={true}
      open={visible}
      onCancel={() => {
        !loadingCreateStoryTask && onClose();
      }}
      footer={null}
      width={720}
    >
      {taskModule === 'Chain' && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: 12, fontSize: 16 }}>
            {formatMessage({ id: 'create-task.reward-title' })}
          </div>
          <InputNumber
            min={0}
            max={balanceOfStoryNft}
            value={rewardsAmount}
            onChange={(e) => setRewardsAmount(e)}
          />
        </div>
        // <Select
        //   disabled={loadingCreateStoryTask}
        //   // mode="multiple"
        //   allowClear
        //   style={{ width: '100%', marginTop: 24, padding: 0 }}
        //   size={'large'}
        //   bordered={false}
        //   placeholder={formatMessage({ id: 'create-task.reward.placeholder' })}
        //   loading={gettingNfts}
        //   options={nfts?.map((nft: number) => ({
        //     value: nft,
        //     label: `${currentStory?.info.title} NFT #${nft}`,
        //   }))}
        //   value={rewards}
        //   notFoundContent={
        //     <Spin spinning={gettingNfts}>
        //       <div className={styles.noNftTip}>
        //         {!!reservedNftRest ? (
        //           <>
        //             <div>
        //               {formatMessage({ id: 'create-task.nft-not-claimed' })}
        //             </div>
        //           </>
        //         ) : balanceOfStoryNft === 0 ? (
        //           <div>{formatMessage({ id: 'create-task.reward.empty' })}</div>
        //         ) : undefined}
        //       </div>
        //     </Spin>
        //   }
        //   onChange={setRewards}
        // />
      )}
      <Input
        disabled={loadingCreateStoryTask}
        maxLength={30}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ fontSize: 24, padding: 0, margin: '24px 0' }}
        bordered={false}
        placeholder={formatMessage({ id: 'create-task.task-name.placeholder' })}
      />
      <MDEditorWithPreview
        value={desc}
        disabled={loadingCreateStoryTask}
        onChange={(e) => setDesc(e)}
        placeholder={formatMessage({
          id: 'create-task.task-desc.placeholder',
        })}
        style={{ fontSize: 16 }}
      />
      <Button
        size={'large'}
        type={'primary'}
        block={true}
        disabled={!title || !desc}
        loading={loadingCreateStoryTask}
        onClick={async () => {
          try {
            await runCreateStoryTask(
              {
                title,
                description: desc,
                // rewards: Array.isArray(rewards) ? rewards : [rewards],
                rewards: rewardsAmount,
              },
              token,
            );
            onClose();
            setTitle('');
            setDesc('');
            setRewards([]);
            setRewardsAmount(0);
            message.success(formatMessage({ id: 'create-task.created' }));
          } catch (e) {
            console.log(e);
            message.error(formatMessage({ id: 'request-failed' }));
          }
        }}
      >
        {formatMessage({ id: 'create-task.create' })}
      </Button>
    </Modal>
  );
}
