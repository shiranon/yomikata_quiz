import { User } from './users'

export const UserList = (user: User) => {
  return (
    <>
      <div>{user.id}</div>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.admin}</div>
      <div>{user.createdAt.toLocaleDateString()}</div>
      <div>{user.updatedAt.toLocaleDateString()}</div>
    </>
  )
}
