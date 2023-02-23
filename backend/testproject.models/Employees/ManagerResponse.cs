namespace testproject.models.Employees;

public record ManagerResponse(
    int ManagerId,
    EmployeePartialResponse Details
);

public record ManagerFullResponse(
  int ManagerId,
  string FirstName,
  string LastName,
  string Email,
  string TelNo,
  bool Status
);
