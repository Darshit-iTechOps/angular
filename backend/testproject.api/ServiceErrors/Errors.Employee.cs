using ErrorOr;

namespace testproject.api.ServiceErrors;

public static class Errors
{
    public static class Employee
    {
        public static Error NotFound => Error.NotFound(
            code: "Employee.NotFound",
            description: "Employee not found"
        );
    }
}