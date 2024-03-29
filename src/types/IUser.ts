export enum UserRole {
	USER = 'user',
	ADMIN = 'admin',
	EXECUTOR = 'executor'
}

export interface IUser {
	id: string
	email: string
	password: string
	surname: string
	name: string
	age: string
	phone: string
	description: string
	avatar: string
	banned: boolean
	banReason: string

	// roles: Role[]
	role: string
}

export interface Role {
	id: number
	value: string
	description: string
	createdAt: string
	updatedAt: string
	UserRoles: UserRoles
}

export interface UserRoles {
	id: number
	roleID: number
	userID: number
}
