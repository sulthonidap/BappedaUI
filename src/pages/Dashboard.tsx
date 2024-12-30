import React from 'react';
import { Activity, Users, DollarSign, ShoppingCart } from 'lucide-react';

const stats = [
  { name: 'Total Revenue', value: '$45,231', icon: DollarSign, change: '+20.1%' },
  { name: 'Active Users', value: '2,345', icon: Users, change: '+15.1%' },
  { name: 'New Orders', value: '345', icon: ShoppingCart, change: '+12.5%' },
  { name: 'Growth Rate', value: '28%', icon: Activity, change: '+4.3%' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600"></p>
                  <p className="text-xl lg:text-2xl font-semibold mt-1"></p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  {/* <Icon className="h-6 w-6 text-blue-600" /> */}
                </div>
              </div>
              <div className="mt-4">
                <span className="text-green-600 text-sm font-medium">
                  
                </span>
                <span className="text-gray-600 text-sm ml-2"></span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
          {/* <h2 className="text-lg font-semibold mb-4">Recent Activity</h2> */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  {/* <Users className="h-5 w-5 text-gray-600" /> */}
                </div>
                <div>
                  {/* <p className="text-sm font-medium">New user registered</p> */}
                  {/* <p className="text-xs text-gray-500">2 minutes ago</p> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
          {/* <h2 className="text-lg font-semibold mb-4">Quick Actions</h2> */}
          <div className="grid grid-cols-2 gap-4">
            {/* {['Add User', 'Create Report', 'Update Settings', 'View Analytics'].map(
              (action) => (
                <button
                  key={action}
                  className="p-4 bg-gray-50 rounded-lg text-sm font-medium hover:bg-gray-100"
                >
                  {action}
                </button>
              )
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}