using Microsoft.AspNetCore.Mvc;

namespace testproject.api.Controllers;

public class ErrorsController : ControllerBase
{
    [Route("/error")]
    [NonAction]
    public IActionResult Error()
    {
        return Problem();
    }

}
