import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

export default function KitchenSink() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold mb-8">Kitchen Sink Demo</h1>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList>
          <TabsTrigger value="basic">Basic Components</TabsTrigger>
          <TabsTrigger value="data">Data Display</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Input Components</CardTitle>
              <CardDescription>Essential form controls and buttons</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Text Input</Label>
                  <Input placeholder="Enter some text..." />
                </div>
                
                <div className="space-y-2">
                  <Label>Checkbox</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label htmlFor="terms">Accept terms and conditions</label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Radio Group</Label>
                  <RadioGroup defaultValue="option-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-1" id="option-1" />
                      <Label htmlFor="option-1">Option 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-2" id="option-2" />
                      <Label htmlFor="option-2">Option 2</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Switch</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Airplane Mode</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Slider</Label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Submit</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Display Components</CardTitle>
              <CardDescription>Components for displaying data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Table</h3>
                  <Table>
                    <TableCaption>A list of recent orders</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Order #1</TableCell>
                        <TableCell>Pending</TableCell>
                        <TableCell>$100.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Order #2</TableCell>
                        <TableCell>Processing</TableCell>
                        <TableCell>$250.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium">Accordion</h3>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is it accessible?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Is it styled?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It comes with default styles that matches your app's design.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="flex space-x-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Avatar</h3>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Badge</h3>
                    <Badge>New</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Calendar</h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Components</CardTitle>
              <CardDescription>Components for user feedback and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Progress</h3>
                  <Progress value={60} className="w-full" />
                </div>

                <div>
                  <h3 className="text-lg font-medium">Alert</h3>
                  <Alert>
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                      You can add components to your app using the cli.
                    </AlertDescription>
                  </Alert>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Alert Dialog</h3>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">Show Alert Dialog</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Dialog</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Show Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="@peduarte" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Toast</h3>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Scheduled: Catch up",
                        description: "Friday, February 10, 2024 at 5:57 PM",
                      })
                    }}
                  >
                    Show Toast
                  </Button>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Skeleton</h3>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Toaster />
    </div>
  )
}