"use client";

import { useState, useEffect } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { BiEdit, BiLoaderAlt } from "react-icons/bi";
import { FaUser, FaLink } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";

export function UpdateUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // current user session a data neuyar system
  const { data: userData } = authClient.useSession();
  const currentUser = userData?.user;

  // modal open hole current name ar image show korbe
  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || "");
      setImage(currentUser.image || "");
    }
  }, [currentUser, isOpen]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name cannot be empty!");
      return;
    }

    // Image URL validation
  if (
    image.trim() &&
    !image.startsWith("http://") &&
    !image.startsWith("https://")
  ) {
    toast.error("Please enter a valid image URL");
    return;
  }

    const isNameSame = name.trim() === (currentUser?.name || "");
    const isImageSame = image.trim() === (currentUser?.image || "");
    if (isNameSame && isImageSame) {
      toast.error("You haven't change anything yet");
      return;
    }

    try {
      setIsLoading(true);

      // Better Auth-sotik method ja sorasori server er sathe mile
      const { data, error } = await authClient.updateUser({
        name: name,
        image: image,
      });

      if (error) {
        toast.error(error.message || "Update failed!");
      } else {
        toast.success("Profile updated successfully! ");

        // page relod deuyar jonne
        setTimeout(() => {
          setIsOpen(false);
          window.location.reload();
        }, 1200);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Button
        onClick={() => setIsOpen(true)}
        variant="secondary"
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all w-full justify-center"
      >
        <BiEdit className="w-4 h-4" /> Update Profile
      </Button>

      <Modal isOpen={isOpen} onClose={() => !isLoading && setIsOpen(false)}>
        <Modal.Backdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Modal.Container className="w-full max-w-md">
            <Modal.Dialog className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full flex flex-col max-h-[90vh]">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
                className="absolute right-4 top-4 text-white/80 hover:text-white text-lg z-50 focus:outline-none bg-black/10 hover:bg-black/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
              >
                ✕
              </button>

              <Modal.Header className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
                    <BiEdit className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <Modal.Heading className="text-xl font-bold text-white">
                      Edit Profile
                    </Modal.Heading>
                    <p className="text-xs text-blue-100 mt-0.5">
                      Update your personal account details
                    </p>
                  </div>
                </div>
              </Modal.Header>

              <form
                onSubmit={handleUpdateProfile}
                className="flex flex-col flex-1 overflow-hidden"
              >
                <Modal.Body className="p-6 overflow-y-auto flex-1">
                  <Surface
                    variant="default"
                    className="border-0 p-0 shadow-none bg-transparent"
                  >
                    <div className="flex flex-col gap-5 text-left">
                      {/* Name Field */}
                      <TextField
                        className="w-full flex flex-col gap-1.5"
                        variant="secondary"
                      >
                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                          <FaUser className="w-3 h-3 text-gray-400" /> Full Name
                        </Label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your new name"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black focus:outline-none focus:border-blue-500 transition-colors"
                          disabled={isLoading}
                        />
                      </TextField>

                      {/* Image URL Field */}
                      <TextField
                        className="w-full flex flex-col gap-1.5"
                        variant="secondary"
                      >
                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                          <FaLink className="w-3 h-3 text-gray-400" /> Profile
                          Image URL
                        </Label>
                        <Input
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                          placeholder="https://example.com/avatar.png"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black focus:outline-none focus:border-blue-500 transition-colors"
                          disabled={isLoading}
                        />
                      </TextField>
                    </div>
                  </Surface>
                </Modal.Body>

                <Modal.Footer className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100 shrink-0">
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="secondary"
                    type="button"
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 min-w-[120px] justify-center disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <BiLoaderAlt className="w-4 h-4 animate-spin" />{" "}
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </Modal.Footer>
              </form>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
