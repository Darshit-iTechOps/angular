using testproject.api.Models;

namespace testproject.api.Services;

public interface IRoleService
{
    Role GetRole(int id);
    List<Role> GetAllRole();
    void CreateEditRole(Role role);
    void DeleteRole(int id);
}
