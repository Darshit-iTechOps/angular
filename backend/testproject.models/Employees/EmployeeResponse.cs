using testproject.models.Departments;
using testproject.models.Roles;

namespace testproject.models.Employees;

public record EmployeeResponse(
    int EmpId,
    string FirstName,
    string LastName,
    string TelNo,
    string Email,
    string Password,
    int RoleID,
    int? ManagerId,
    int? DeptId,
    bool Status
);

public record EmployeeFullResponse(
   int EmpId,
    string FirstName,
    string LastName,
    string TelNo,
    string Email,
    string Password,
    RoleResponse Role,
    ManagerFullResponse Manager,
    DepartmentFullResponse Department,
    bool Status
);
