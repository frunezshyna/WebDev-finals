import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ChangePass({ showModal, setShowModal }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            Swal.fire({
                title: "ERROR CHANGING PASSWORD!",
                text: "New passwords do not match.",
                icon: "error"
            });
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/users/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await response.json();

            if (data.code === "PASSWORD-CHANGE-SUCCESS") {
                Swal.fire({
                    title: "PASSWORD CHANGE SUCCESS!",
                    text: "You can now login with your new password.",
                    icon: "success"
                });

                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");

                setShowModal(false);
            } else {
                Swal.fire({
                    title: "PASSWORD ERROR!",
                    text: data.message || "Error changing password.",
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "ERROR!",
                text: "An error occurred while changing the password.",
                icon: "error",
            });
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-bottom" centered animation={true}>
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group controlId="currentPassword" className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="newPassword" className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="confirmPassword" className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" className="w-25 rounded-pill" onClick={() => setShowModal(false)}>Close</Button>
                <Button variant="warning" className="w-25 rounded-pill" onClick={handlePasswordChange}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
}
