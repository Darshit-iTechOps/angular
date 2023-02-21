import { createAction } from '@ngrx/store';
import { Department } from '@models/department.model';

export const getDepartments = createAction('[Department] Get Departments');

export const getDepartmentsSuccess = createAction(
  '[Department] Get Departments Success',
  (departments: Department[]) => ({ departments })
);

export const getDepartmentsFailure = createAction(
  '[Department] Get Departments Failure',
  (error: string) => ({ error })
);

export const addDepartment = createAction(
  '[Role] Add Department',
  (deptId: number, department: Department) => ({ deptId, department })
);

export const editDepartment = createAction(
  '[Department] Edit Department',
  (deptId: number, department: Department) => ({ deptId, department })
);

export const addDepartmentSuccess = createAction(
  '[Department] Add Department Success',
  (department: Department) => ({ department })
);

export const editDepartmentSuccess = createAction(
  '[Department] Edit Department Success',
  (department: Department) => ({ department })
);

export const updateDepartmentStatus = createAction(
  '[Department] Update Department Status',
  (deptId: number) => ({ deptId })
);

export const updateDepartmentStatusSuccess = createAction(
  '[Department] Update Department Status Success',
  (department: Department) => ({ department })
);
