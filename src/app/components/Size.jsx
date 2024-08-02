// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const Size = () => {
//   const smallData = [
//     { code: "INV001", name: "Paid", category: "Credit Card" },
//     { code: "INV002", name: "Paid", category: "Credit Card" },
//     { code: "INV003", name: "Paid", category: "Credit Card" },
//     { code: "INV004", name: "Paid", category: "Credit Card" },
//   ];

//   const normalData = [
//     { code: "INV005", name: "Unpaid", category: "Debit Card" },
//     { code: "INV006", name: "Unpaid", category: "Debit Card" },
//     { code: "INV007", name: "Unpaid", category: "Debit Card" },
//     { code: "INV008", name: "Unpaid", category: "Debit Card" },
//   ];

//   const largeData = [
//     { code: "INV009", name: "Pending", category: "Bank Transfer" },
//     { code: "INV010", name: "Pending", category: "Bank Transfer" },
//     { code: "INV011", name: "Pending", category: "Bank Transfer" },
//     { code: "INV012", name: "Pending", category: "Bank Transfer" },
//   ];

//   return (
//     <>
//       <div className="mt-28">
//         <h2 className="text-center font-bold">Size</h2>
//         <Tabs defaultValue="account" className="w-[1000px] m-auto mt-10">
//           <TabsList className="border border-gray-400 w-60 p-6 flex justify-center">
//             <TabsTrigger value="account" className="active:bg-sky-500">
//               Small
//             </TabsTrigger>
//             <TabsTrigger value="password">Normal</TabsTrigger>
//             <TabsTrigger value="large">Large</TabsTrigger>
//           </TabsList>
//           <TabsContent value="account">
//             <Table className="w-[50%] m-auto mt-5">
//               <TableHeader>
//                 <TableRow className="bg-slate-100">
//                   <TableHead className="font-bold text-gray-700">Code</TableHead>
//                   <TableHead className="font-bold text-gray-700">Name</TableHead>
//                   <TableHead className="font-bold text-gray-700">Category</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {smallData.map((row, rowIndex) => (
//                   <TableRow key={rowIndex}>
//                     <TableCell className="font-medium">{row.code}</TableCell>
//                     <TableCell>{row.name}</TableCell>
//                     <TableCell>{row.category}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TabsContent>
//           <TabsContent value="password">
//             <Table className="w-[50%] m-auto mt-5">
//               <TableHeader>
//                 <TableRow className="bg-slate-100">
//                   <TableHead className="font-bold text-gray-700">Code</TableHead>
//                   <TableHead className="font-bold text-gray-700">Name</TableHead>
//                   <TableHead className="font-bold text-gray-700">Category</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {normalData.map((row, rowIndex) => (
//                   <TableRow key={rowIndex}>
//                     <TableCell className="font-medium">{row.code}</TableCell>
//                     <TableCell>{row.name}</TableCell>
//                     <TableCell>{row.category}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TabsContent>
//           <TabsContent value="large">
//             <Table className="w-[50%] m-auto mt-5">
//               <TableHeader>
//                 <TableRow className="bg-slate-100">
//                   <TableHead className="font-bold text-gray-700">Code</TableHead>
//                   <TableHead className="font-bold text-gray-700">Name</TableHead>
//                   <TableHead className="font-bold text-gray-700">Category</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {largeData.map((row, rowIndex) => (
//                   <TableRow key={rowIndex}>
//                     <TableCell className="font-medium">{row.code}</TableCell>
//                     <TableCell>{row.name}</TableCell>
//                     <TableCell>{row.category}</TableCell>                  </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </>
//   );
// };

// export default Size;