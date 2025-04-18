
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, TrendingDown, Plus, FilePlus, FileText, Wallet, Filter, Download, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import InvoiceForm from "@/components/finances/InvoiceForm";
import InvoiceList, { Invoice } from "@/components/finances/InvoiceList";

const Finances = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      number: "INV-230415-0001",
      client: "Acme Development Corp",
      project: "Skyline Tower",
      amount: 25000,
      issueDate: "2025-04-01",
      dueDate: "2025-04-30",
      status: "sent"
    },
    {
      id: "2",
      number: "INV-230405-0002",
      client: "Coastal Living Group",
      project: "Oceanview Residences",
      amount: 18500,
      issueDate: "2025-04-05",
      dueDate: "2025-05-05",
      status: "draft"
    },
    {
      id: "3",
      number: "INV-230320-0003",
      client: "Metropolitan Builders Inc",
      project: "Central Business Hub",
      amount: 42000,
      issueDate: "2025-03-20",
      dueDate: "2025-04-19",
      status: "paid"
    }
  ]);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleAddTransaction = () => {
    toast({
      title: "Add Transaction",
      description: "Transaction form will appear here",
    });
  };

  const handleStatusChange = (invoiceId: string, newStatus: Invoice['status']) => {
    setInvoices(prev => prev.map(invoice => 
      invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice
    ));
  };

  const handleInvoiceCreated = () => {
    // In a real app, we would fetch the updated invoices from the API
    // For now, let's just switch to the invoices tab
    setActiveTab("invoices");
  };

  // Mock financial data
  const projectBudgets = [
    { id: 1, project: "Skyline Tower", budget: 1200000, spent: 780000, remaining: 420000 },
    { id: 2, project: "Oceanview Residences", budget: 850000, spent: 320000, remaining: 530000 },
    { id: 3, project: "Central Business Hub", budget: 1800000, spent: 950000, remaining: 850000 },
    { id: 4, project: "Riverside Complex", budget: 950000, spent: 580000, remaining: 370000 },
    { id: 5, project: "Mountain View Condos", budget: 720000, spent: 680000, remaining: 40000 }
  ];
  
  const recentTransactions = [
    { id: 1, date: "2025-04-10", description: "Material Purchase - Concrete", project: "Skyline Tower", amount: 12500, type: "expense" },
    { id: 2, date: "2025-04-08", description: "Equipment Rental - Crane", project: "Oceanview Residences", amount: 8700, type: "expense" },
    { id: 3, date: "2025-04-07", description: "Client Payment", project: "Central Business Hub", amount: 45000, type: "income" },
    { id: 4, date: "2025-04-05", description: "Contractor Payment", project: "Skyline Tower", amount: 18500, type: "expense" },
    { id: 5, date: "2025-04-03", description: "Client Payment", project: "Riverside Complex", amount: 35000, type: "income" }
  ];
  
  return (
    <PageLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finances</h1>
          <p className="text-gray-500 mt-1">
            Track and manage your project finances
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button className="bg-construction-700 hover:bg-construction-800" onClick={handleAddTransaction}>
            <Plus className="h-4 w-4 mr-2" /> Add Transaction
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Budget</span>
                <span className="bg-blue-100 text-blue-800 rounded-md p-1 text-xs">All Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-construction-600" />
                <span className="text-2xl font-bold">{formatCurrency(5520000)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Spent</span>
                <span className="bg-orange-100 text-orange-800 rounded-md p-1 text-xs">All Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-orange-600" />
                <span className="text-2xl font-bold">{formatCurrency(3310000)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Remaining</span>
                <span className="bg-green-100 text-green-800 rounded-md p-1 text-xs">All Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold">{formatCurrency(2210000)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Revenue</span>
                <span className="bg-purple-100 text-purple-800 rounded-md p-1 text-xs">YTD</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold">{formatCurrency(2850000)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Project Budgets</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Total Budget</TableHead>
                    <TableHead>Spent</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Utilization</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectBudgets.map((budget) => {
                    const utilizationPercentage = Math.round((budget.spent / budget.budget) * 100);
                    let utilizationColor = "bg-green-500";
                    if (utilizationPercentage > 90) {
                      utilizationColor = "bg-red-500";
                    } else if (utilizationPercentage > 70) {
                      utilizationColor = "bg-yellow-500";
                    }
                    
                    return (
                      <TableRow key={budget.id}>
                        <TableCell className="font-medium">{budget.project}</TableCell>
                        <TableCell>{formatCurrency(budget.budget)}</TableCell>
                        <TableCell>{formatCurrency(budget.spent)}</TableCell>
                        <TableCell>{formatCurrency(budget.remaining)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={utilizationPercentage} 
                              className="h-2"
                              indicatorClassName={utilizationColor} 
                            />
                            <span className="text-sm">{utilizationPercentage}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" /> Filter by Date
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{transaction.description}</TableCell>
                      <TableCell>{transaction.project}</TableCell>
                      <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                      <TableCell>
                        {transaction.type === 'income' ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Income
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Expense
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Invoices</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
                <InvoiceForm onInvoiceCreated={handleInvoiceCreated} />
              </div>
            </CardHeader>
            <CardContent>
              {invoices.length > 0 ? (
                <InvoiceList
                  invoices={invoices}
                  onStatusChange={handleStatusChange}
                />
              ) : (
                <div className="text-center p-12">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No invoices yet</h3>
                  <p className="text-gray-500 mb-4">
                    Create your first invoice to start tracking payments
                  </p>
                  <InvoiceForm onInvoiceCreated={handleInvoiceCreated} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button className="h-auto py-8 flex flex-col items-center justify-center" variant="outline">
                  <FileText className="h-12 w-12 mb-2 text-gray-500" />
                  <span className="text-lg font-medium">Monthly Budget Report</span>
                </Button>
                <Button className="h-auto py-8 flex flex-col items-center justify-center" variant="outline">
                  <FileText className="h-12 w-12 mb-2 text-gray-500" />
                  <span className="text-lg font-medium">Project Expense Report</span>
                </Button>
                <Button className="h-auto py-8 flex flex-col items-center justify-center" variant="outline">
                  <FileText className="h-12 w-12 mb-2 text-gray-500" />
                  <span className="text-lg font-medium">Annual Financial Summary</span>
                </Button>
                <Button className="h-auto py-8 flex flex-col items-center justify-center" variant="outline">
                  <FileText className="h-12 w-12 mb-2 text-gray-500" />
                  <span className="text-lg font-medium">Custom Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Finances;
