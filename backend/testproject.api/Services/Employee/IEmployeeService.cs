using testproject.api.Models;

namespace testproject.api.Services;

public interface IEmployeeService
{
    Employee GetCurrentUser(string email, string password);
    Employee GetEmployee(int id);
    List<Employee> GetAllEmployees();
    void CreateEditEmployee(int id, Employee employee);
}
