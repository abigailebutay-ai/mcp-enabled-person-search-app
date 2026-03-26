'use client'

import { userFormSchema, User, UserFormData } from '@/app/actions/schemas'
import { UserForm } from './user-form'
import MutableDialog, { ActionState } from '@/components/mutable-dialog'

interface UserEditDialogProps {
  user: User
}

export function UserEditDialog({ user }: UserEditDialogProps) {
  const handleEditUser = async (data: UserFormData): Promise<ActionState<User>> => {
    try {
      const response = await fetch('/api/people', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: user.id, ...data })
      })

      const payload = await response.json()

      if (!response.ok) {
        return {
          success: false,
          message: payload.error || 'Failed to update user',
        }
      }

      const updatedUser = payload as User
      return {
        success: true,
        message: `User ${updatedUser.name} updated successfully`,
        data: updatedUser,
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update user' + (error instanceof Error ? error.message : String(error)),
      }
    }
  }

  return (
    <MutableDialog<UserFormData>
      formSchema={userFormSchema}
      FormComponent={UserForm}
      action={handleEditUser}
      triggerButtonLabel="Edit"
      editDialogTitle={`Edit ${user.name}`}
      dialogDescription={`Update the details of ${user.name} below.`}
      submitButtonLabel="Save Changes"
      defaultValues={{
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }}
    />
  )
}
