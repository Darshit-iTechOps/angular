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
