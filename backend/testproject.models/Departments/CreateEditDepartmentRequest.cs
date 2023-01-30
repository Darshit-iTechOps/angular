namespace testproject.models.Departments;

public record CreateEditDepartmentRequest(
    string Name,
    int ManagerId,
    bool Status
);
