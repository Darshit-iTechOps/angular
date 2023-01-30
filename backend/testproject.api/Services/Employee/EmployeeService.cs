using testproject.api.Data;
using testproject.api.Models;
using Microsoft.EntityFrameworkCore;

namespace testproject.api.Services;

public class EmployeeService : IEmployeeService
{
    private readonly DataContext _context;
    public EmployeeService(DataContext context) => _context = context;
    public List<Employee> GetAllEmployees() =>
     _context.Employees.Where(u => u.RoleID == u.Role.RoleID
       && u.DeptId == u.Department.DeptId)
      .Include(u => u.Role)
      .Include(u => u.Department)
      .ToList();

    public Employee GetEmployee(int id) =>
      _context.Employees.Where(u => u.RoleID == u.Role.RoleID
       && u.DeptId == u.Department.DeptId)
      .Include(u => u.Role)
      .Include(u => u.Department)
      .FirstOrDefault((employee) => employee.EmpId == id);

    public Employee GetCurrentUser(string email, string password) =>
      _context.Employees.Where(u => u.RoleID == u.Role.RoleID
      && u.DeptId == u.Department.DeptId)
     .Include(u => u.Role)
     .Include(u => u.Department)
     .FirstOrDefault((employee) => employee.Email == email && employee.Password == password);

  public void CreateEditEmployee(int id, Employee employee)
    {
        if (_context.Employees.Any(employee => employee.EmpId == id))
            _context.Update(employee);
        else
            _context.Add(employee);
        _context.SaveChanges();
    }
}
