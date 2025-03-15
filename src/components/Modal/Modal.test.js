import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from './Modal';

test('renders modal with correct message and buttons', () => {
  const handleClose = jest.fn();
  const handleConfirm = jest.fn();

  render(
    <Modal
      isOpen={true}
      onClose={handleClose}
      onConfirm={handleConfirm}
      message="Are you sure you want to delete this event?"
    />
  );

  expect(screen.getByText('Confirmation')).toBeInTheDocument();
  expect(screen.getByText('Are you sure you want to delete this event?')).toBeInTheDocument();
  expect(screen.getByText('Confirm')).toBeInTheDocument();
  expect(screen.getByText('Cancel')).toBeInTheDocument();
});

test('calls onConfirm when confirm button is clicked', () => {
  const handleClose = jest.fn();
  const handleConfirm = jest.fn();

  render(
    <Modal
      isOpen={true}
      onClose={handleClose}
      onConfirm={handleConfirm}
      message="Are you sure you want to delete this event?"
    />
  );

  fireEvent.click(screen.getByText('Confirm'));
  expect(handleConfirm).toHaveBeenCalledTimes(1);
});

test('calls onClose when cancel button is clicked', () => {
  const handleClose = jest.fn();
  const handleConfirm = jest.fn();

  render(
    <Modal
      isOpen={true}
      onClose={handleClose}
      onConfirm={handleConfirm}
      message="Are you sure you want to delete this event?"
    />
  );

  fireEvent.click(screen.getByText('Cancel'));
  expect(handleClose).toHaveBeenCalledTimes(1);
}); 