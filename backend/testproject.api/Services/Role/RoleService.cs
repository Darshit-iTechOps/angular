using testproject.api.Data;
using testproject.api.Models;

namespace testproject.api.Services;

public class RoleService : IRoleService
{
  private readonly DataContext _context;
  public RoleService(DataContext context) => _context = context;
  public List<Role> GetAllRole() => _context.Roles.ToList();
  public Role GetRole(int id) => _context.Roles.FirstOrDefault((role) => role.RoleID == id);

  public void CreateEditRole(Role role)
  {
    if (_context.Roles.Any(r => r.RoleID == role.RoleID))
      _context.Update(role);
    else
      _context.Add(role);
    _context.SaveChanges();
  }

  public void DeleteRole(int id)
  {
    var role = GetRole(id);
    if (_context.Roles.Any(r => r.RoleID == id))
      _context.Remove(role);
    _context.SaveChanges();
  }
}
