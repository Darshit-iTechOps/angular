using testproject.api.Data;
using testproject.api.Models;
using Microsoft.EntityFrameworkCore;

namespace testproject.api.Services;

public class ManagerService : IManagerService
{
    private readonly DataContext _context;

    public ManagerService(DataContext context) => _context = context;

    public List<Manager> GetAllManagers() =>
    _context.Managers.Where(m => m.EmpId == m.Employee.EmpId
    && m.Employee.RoleID == m.Employee.Role.RoleID
    )
    .Include(m => m.Employee)
    .Include(m=>m.Employee.Role)
    .ToList();

    public Manager GetSingleManager(int id) =>
    _context.Managers.Where(m => m.EmpId == m.Employee.EmpId
    && m.Employee.RoleID == m.Employee.Role.RoleID
    )
    .Include(m => m.Employee)
    .Include(m => m.Employee.Role)
    .FirstOrDefault((manager) => manager.ManagerId == id);

}
