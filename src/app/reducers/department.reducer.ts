import { DepartmentState } from '@models/department.model';
import { createReducer, on } from '@ngrx/store';
import * as DepartmentActions from '@actions/department.action';

export const initialState: DepartmentState = {
  isLoading: false,
  departments: [],
  error: null,
};

export const departmentReducer = createReducer(
  initialState,
  on(DepartmentActions.getDepartments, (state: any) => ({
    ...state,
    isLoading: true,
  })),
  on(
    DepartmentActions.getDepartmentsSuccess,
    (state: any, { departments }) => ({
      ...state,
      isLoading: false,
      departments: departments,
    })
  ),
  on(DepartmentActions.getDepartmentsFailure, (state: any, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(DepartmentActions.addDepartment, (state: any) => ({
    ...state,
    isLoading: true,
  })),
  on(DepartmentActions.editDepartment, (state: any) => ({
    ...state,
    isLoading: true,
  })),
  on(DepartmentActions.updateDepartmentStatus, (state: any) => ({
    ...state,
    isLoading: true,
  })),
  on(DepartmentActions.addDepartmentSuccess, (state: any, { department }) => {
    const updatedDepartments = state.departments.map((d: any) => {
      return department.deptId === d.deptId ? department : d;
    });
    return {
      ...state,
      departments: updatedDepartments,
      isLoading: false,
    };
  }),
  on(DepartmentActions.editDepartmentSuccess, (state: any, { department }) => {
    const updatedDepartments = state.departments.map((d: any) => {
      return department.deptId === d.deptId ? department : d;
    });
    return {
      ...state,
      departments: updatedDepartments,
      isLoading: false,
    };
  }),
  on(
    DepartmentActions.updateDepartmentStatusSuccess,
    (state: any, { department }) => {
      const updatedDepartments = state.departments.map((d: any) => {
        return department.deptId === d.deptId ? department : d;
      });
      return {
        ...state,
        departments: updatedDepartments,
        isLoading: false,
      };
    }
  )
);
