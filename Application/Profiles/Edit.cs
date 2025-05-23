using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string DisplayName { get; set; }
            public string Bio { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x=>x.UserName==_userAccessor.GetUsername());

                user.Bio = request.Bio ?? request.Bio;
                user.DisplayName = request.DisplayName ?? request.DisplayName;

                //bu satır user profilinde herhangi bir değişlik yapmasa bile hata fırlatmadan update işlemini yapmasını sağlar. ancak bu programda bunu istemiyoruz
                // _context.Entry(user).State = EntityState.Modified;

                var success = await _context.SaveChangesAsync()>0;
                if(success) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Problem updating profile");
            }
        }
    }
}