
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Briefcase
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TeamMemberForm from "@/components/team/TeamMemberForm";

interface TeamMember {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  role: string;
  avatar_url?: string | null;
  position?: string;
  department?: string;
}

const Team = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      first_name: "John",
      last_name: "Smith",
      email: "john.smith@edifice.com",
      phone: "+1 (555) 123-4567",
      role: "Project Manager",
      position: "Senior Project Manager",
      department: "Management",
    },
    {
      id: "2",
      first_name: "Sarah",
      last_name: "Johnson",
      email: "sarah.johnson@edifice.com",
      phone: "+1 (555) 234-5678",
      role: "Civil Engineer",
      position: "Lead Engineer",
      department: "Engineering",
    },
    {
      id: "3",
      first_name: "Michael",
      last_name: "Chen",
      email: "michael.chen@edifice.com",
      phone: "+1 (555) 345-6789",
      role: "Architect",
      position: "Senior Architect",
      department: "Design",
    },
    {
      id: "4",
      first_name: "Jessica",
      last_name: "Williams",
      email: "jessica.williams@edifice.com",
      phone: "+1 (555) 456-7890",
      role: "Site Supervisor",
      position: "Construction Supervisor",
      department: "Construction",
    },
    {
      id: "5",
      first_name: "Robert",
      last_name: "Brown",
      email: "robert.brown@edifice.com",
      phone: "+1 (555) 567-8901",
      role: "Safety Officer",
      position: "Safety Coordinator",
      department: "Safety",
    }
  ]);

  // Filter team members based on search term
  const filteredTeamMembers = teamMembers.filter(member => {
    const fullName = `${member.first_name} ${member.last_name}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      member.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const handleMemberAdded = () => {
    // In a real app, we would fetch the updated team members from the API
  };

  const handleViewProfile = (member: TeamMember) => {
    toast({
      title: "Member Profile",
      description: `Viewing profile for ${member.first_name} ${member.last_name}`,
    });
  };

  const handleEditMember = (member: TeamMember) => {
    toast({
      title: "Edit Member",
      description: `Editing profile for ${member.first_name} ${member.last_name}`,
    });
  };

  const handleViewProjects = (member: TeamMember) => {
    toast({
      title: "Member Projects",
      description: `Viewing projects for ${member.first_name} ${member.last_name}`,
    });
  };

  return (
    <PageLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-gray-500 mt-1">
            Manage and coordinate your team members
          </p>
        </div>
        <TeamMemberForm onMemberAdded={handleMemberAdded} />
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search team members..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeamMembers.length > 0 ? (
                filteredTeamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar_url || undefined} alt={`${member.first_name} ${member.last_name}`} />
                          <AvatarFallback className="bg-construction-100 text-construction-700">
                            {getInitials(member.first_name, member.last_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          {`${member.first_name} ${member.last_name}`}
                          <div className="text-xs text-gray-500">
                            {member.position}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>{member.department || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{member.email || 'Not specified'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{member.phone || 'Not specified'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="bg-transparent p-2 rounded-full hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewProfile(member)}>
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditMember(member)}>
                            Edit Member
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewProjects(member)}>
                            View Projects
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                    No team members found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Team;
