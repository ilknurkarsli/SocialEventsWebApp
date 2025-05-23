using Application.Activities;
using Application.Comments;
using Application.Profiles;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles :AutoMapper.Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;

            CreateMap<Activity, Activity>();

            CreateMap<Activity, ActivityDTO>().ForMember(x=>x.HostUsername, y=>y.MapFrom(z=>z.Attendees.FirstOrDefault(p=>p.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, AttendeeDTO>()
            .ForMember(d=>d.Displayname, o=>o.MapFrom(s=>s.AppUser.DisplayName))
            .ForMember(d=>d.Username, o=>o.MapFrom(s=>s.AppUser.UserName))
            .ForMember(d=>d.Bio, o=>o.MapFrom(s=>s.AppUser.Bio))
            .ForMember(d=>d.Image, o=>o.MapFrom(s=>s.AppUser.Photos.FirstOrDefault(p=>p.IsMain).Url))
            .ForMember(d=>d.FollowersCount, o=>o.MapFrom(s=>s.AppUser.Followers.Count))
            .ForMember(d=>d.FollowingCount, o=>o.MapFrom(s=>s.AppUser.Followings.Count))
            .ForMember(d=>d.Following, o=>o.MapFrom(o=>o.AppUser.Followers.Any(x=>x.Observer.UserName==currentUsername)));;

            CreateMap<AppUser, Profiles.Profile>().ForMember(d=>d.Image, o=>o.MapFrom(s=>s.Photos.FirstOrDefault(p=>p.IsMain).Url))
            .ForMember(d=>d.FollowersCount, o=>o.MapFrom(s=>s.Followers.Count))
            .ForMember(d=>d.FollowingCount, o=>o.MapFrom(s=>s.Followings.Count))
            .ForMember(d=>d.Following, o=>o.MapFrom(o=>o.Followers.Any(x=>x.Observer.UserName==currentUsername)));

            CreateMap<Comment, CommentDTO>().ForMember(d=>d.Displayname, o=>o.MapFrom(s=>s.Author.DisplayName))
            .ForMember(d=>d.Username, o=>o.MapFrom(s=>s.Author.UserName))
            .ForMember(d=>d.Image, o=>o.MapFrom(s=>s.Author.Photos.FirstOrDefault(p=>p.IsMain).Url));

            CreateMap<ActivityAttendee, UserActivityDTO>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Activity.Id))
                .ForMember(d => d.Date, o => o.MapFrom(s => s.Activity.Date))
                .ForMember(d => d.Title, o => o.MapFrom(s => s.Activity.Title))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Activity.Category))
                .ForMember(d => d.HostUsername, o => o.MapFrom(s =>
                    s.Activity.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));
        }
    }
}