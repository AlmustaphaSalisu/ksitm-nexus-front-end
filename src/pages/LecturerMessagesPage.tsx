import { MessageSquare, Send, Search, Filter, Clock, Check, CheckCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const LecturerMessagesPage = () => {
  const conversations = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Student',
      lastMessage: 'Thank you for the clarification on the assignment',
      time: '2 hours ago',
      unread: 2,
      avatar: 'JS',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Student',
      lastMessage: 'Can we schedule a meeting to discuss my project?',
      time: '5 hours ago',
      unread: 1,
      avatar: 'SJ',
    },
    {
      id: 3,
      name: 'Dr. Michael Brown',
      role: 'Colleague',
      lastMessage: 'Great work on the curriculum update!',
      time: '1 day ago',
      unread: 0,
      avatar: 'MB',
    },
    {
      id: 4,
      name: 'Emily Davis',
      role: 'Student',
      lastMessage: 'I submitted the revised assignment',
      time: '2 days ago',
      unread: 0,
      avatar: 'ED',
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'John Smith',
      content: 'Hi Professor, I have a question about the data structures assignment.',
      time: '3:30 PM',
      isMe: false,
    },
    {
      id: 2,
      sender: 'Me',
      content: 'Sure, what specific part are you having trouble with?',
      time: '3:35 PM',
      isMe: true,
    },
    {
      id: 3,
      sender: 'John Smith',
      content: 'The binary tree traversal algorithms are a bit confusing.',
      time: '3:40 PM',
      isMe: false,
    },
    {
      id: 4,
      sender: 'Me',
      content: 'Let me explain. In-order traversal visits left subtree, then root, then right subtree...',
      time: '3:45 PM',
      isMe: true,
    },
    {
      id: 5,
      sender: 'John Smith',
      content: 'Thank you for the clarification on the assignment',
      time: '3:50 PM',
      isMe: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Communicate with students and colleagues</p>
        </div>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Recent messages</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer border-b"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{conversation.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{conversation.name}</p>
                      <span className="text-xs text-muted-foreground">{conversation.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {conversation.role}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>John Smith</CardTitle>
                <CardDescription>Student - CS101</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Messages */}
              <div className="space-y-4 max-h-64 overflow-y-auto p-4 border rounded-lg">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isMe
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {!message.isMe && (
                        <p className="text-xs font-medium mb-1">{message.sender}</p>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                        {message.isMe && (
                          <CheckCheck className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <div className="h-4 w-4 bg-red-600 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-muted-foreground">Average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LecturerMessagesPage;
