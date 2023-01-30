using testproject.api.Models;

namespace testproject.api.Services;

public interface IManagerService
{
    List<Manager> GetAllManagers();
    Manager GetSingleManager(int id);
}