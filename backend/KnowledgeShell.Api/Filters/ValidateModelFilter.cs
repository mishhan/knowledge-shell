using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace KnowledgeShell.Api.Filters;

public class ValidateModelFilter : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var isValidModel = context.ModelState.IsValid;
        if (!isValidModel) context.Result = new BadRequestObjectResult(context.ModelState);

        base.OnActionExecuting(context);
    }
}