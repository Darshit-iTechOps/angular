namespace testproject.models.Employees;

public record ManagerResponse(
    int ManagerId,
    EmployeePartialResponse Details
);
