using testproject.models.Employees;

namespace testproject.models.Departments;

public record DepartmentResponse(
    int DeptId,
    string Name,
    int? ManagerId,
    ManagerResponse Manager,
    bool Status
);
