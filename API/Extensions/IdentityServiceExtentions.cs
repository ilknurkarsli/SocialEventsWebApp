using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Services;
using Domain;
using Infrasructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtentions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddIdentityCore<AppUser>(opt=>{
                opt.Password.RequireNonAlphanumeric=false;
                opt.User.RequireUniqueEmail=true;
            }).AddEntityFrameworkStores<DataContext>();
            services.AddAuthentication();
            services.AddAuthorization(opt=>{
                opt.AddPolicy("IsActivtiyHost", policy=>{
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });
            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

            //services.AddTransient<TokenService>(); ve services.AddSingleton<TokenService>(); Addscoped un diğer alternatifleri. Uygulamaya service eklemek istediğimizde kullanılıyor. biri servisi çok kısa süreli ayakta tutuyor diğeri ise cok uzun süreli. scoped en ideal olanı.
            services.AddScoped<TokenService>();
            var key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes(configuration["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>{
                options.TokenValidationParameters=new TokenValidationParameters
                {
                    ValidateAudience=false,
                    ValidateIssuer=false,
                    IssuerSigningKey=key,
                    ValidateIssuerSigningKey=true,
                };
                //SignlaR a bağlanıgımzda gonderdiğimiz tokenı alıp (access_token) pathle kıyaslıyor ("/chat") ve uyuşursa tokenı context e ekliyor 
                options.Events= new JwtBearerEvents
                {
                    OnMessageReceived = context=>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        var path = context.HttpContext.Request.Path;
                        if(!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chat"))
                        {
                            context.Token=accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });
            return services;
        }
    }
}