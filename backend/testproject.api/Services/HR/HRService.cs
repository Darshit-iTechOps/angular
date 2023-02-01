using testproject.api.Data;
using testproject.api.Models;
using Microsoft.EntityFrameworkCore;

namespace testproject.api.Services;

public class HRService : IHRService
{
  private readonly DataContext _context;
  public HRService(DataContext context) =>
    _context = context;

  public List<HR> GetAllHRs() =>
  _context.HRs.Where(h => h.EmpId == h.Employee.EmpId
    && h.Employee.RoleID == h.Employee.Role.RoleID
    )
    .Include(h => h.Employee)
    .Include(h => h.Employee.Role)
    .ToList();

  public HR GetSingleHR(int id) =>
    _context.HRs.Where(h => h.EmpId == h.Employee.EmpId
    && h.Employee.RoleID == h.Employee.Role.RoleID
    )
    .Include(h => h.Employee)
    .Include(h => h.Employee.Role)
    .FirstOrDefault((hr) => hr.HRId == id);
}

