using testproject.models.Roles;

namespace testproject.models.Employees
{
  internal class PartialResponse
  {
  }
  public record EmployeePartialResponse(
    int EmpId,
    string FirstName,
    string LastName,
    string TelNo,
    string Email,
    RoleResponse Role,
    int? ManagerId,
    int? DeptId,
    bool Status
  );
}
