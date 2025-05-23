using Application.Activities;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {    
        //     private readonly IMediator _mediator;
        //     public ActivitiesController(IMediator mediator)
        //     {
        //        _mediator=mediator;
        //     }
        
        [HttpGet] //api/activities
        public async Task<IActionResult> GetActivities([FromQuery] ActivityParams param)
        {
            return HandlePageResult( await Mediator.Send(new List.Query{Params=param}));
        }
        [HttpGet("{id}")] //api/activities/jshdyyqq
        public async Task<ActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id=id}));
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Activity=activity}));
        }
        [Authorize(Policy ="IsActivtiyHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id=id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity=activity}));
            
        }
        [Authorize(Policy ="IsActivtiyHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send( new Delete.Command{Id=id}));
        }
        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend (Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id=id}));
        }
    }
}