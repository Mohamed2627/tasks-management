import { useState } from 'react'
import Modal from 'react-modal';
import { customModalStyles } from '../../constants';
import CustomButton from '../Shared/CustomButton';
import { StyledInput } from '../Form/StyledInput';
import { useCreateStatus } from '../../hooks/useCreateStatus';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { toLowerCaseWithDash } from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const AddNewStatus = () => {

  const { createStatus, isCreatingStatus } = useCreateStatus()
  // States-----------------------------------------
  const [modalIsOpen, setIsOpen] = useState(false);
  const [statusName, setStatusName] = useState("");

  // Functions--------------------------------------
  const closeModal = () => {
    setIsOpen(false);
  }

  const handleSubmit = () => {
    if (!statusName.trim()) return;
    const statusValue = toLowerCaseWithDash(statusName);

    const newStatus = {
      id: uuidv4(),
      label: statusName,
      value: statusValue,
    };

    createStatus(newStatus, {
      onSuccess: () => {
        closeModal()
        setStatusName("");
        toast.success("Status created successfully!");
      }
    })
  }

  return (
    <>
      <CustomButton
        variant='outline'
        onClick={() => setIsOpen(true)}
        className='px-2'
      >
        Add new Status
      </CustomButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        <div className='flex p-4 flex-col w-full min-w-[50vw] background-theme items-center gap-y-6 justify-between'>
          <h2 className=''>Add New Status</h2>
          <StyledInput
            value={statusName}
            onChange={(e) => setStatusName(e.target.value)}
            placeholder='Enter the status name. Ex: completed'
          />
          <div className='flex flex-row w-full items-center justify-between'>
            <CustomButton
              variant='outline'
              onClick={closeModal}
              className='text-error border-error'
            >
              Cancel
            </CustomButton>
            <CustomButton
              onClick={handleSubmit}
              disabled={isCreatingStatus}
            >
              {isCreatingStatus ? (
                <LoadingSpinner className='w-8 h-8' />
              ) :
                "Save Status"
              }
            </CustomButton>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AddNewStatus