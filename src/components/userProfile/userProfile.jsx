import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function UserProfile ({firstName="John"}= props){
  return (
    <div className="flex flex-col justify-center w-full items-center pt-6">
      <Avatar className="mb-2">
        <AvatarFallback className="text-2xl font-semibold">
          {firstName.slice(0,1)}
        </AvatarFallback>
      </Avatar>
      <h4>Hello, {firstName}</h4>
    </div>
  );
}