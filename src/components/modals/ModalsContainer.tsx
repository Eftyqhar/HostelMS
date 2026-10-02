import React from 'react';
import { AddStudentModal } from './AddStudentModal';
import { AssignRoomModal } from './AssignRoomModal';
import { PaymentModal } from './PaymentModal';
import { NewComplaintModal } from './NewComplaintModal';
import { VisitorModal } from './VisitorModal';
import { RoomDetailModal } from './RoomDetailModal';
import { InvoiceModal } from './InvoiceModal';

export const ModalsContainer: React.FC = () => {
  return (
    <>
      <AddStudentModal />
      <AssignRoomModal />
      <PaymentModal />
      <NewComplaintModal />
      <VisitorModal />
      <RoomDetailModal />
      <InvoiceModal />
    </>
  );
};
