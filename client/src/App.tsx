// src/App.jsx

// src/App.tsx
import { Button } from "@/components/ui/button";
import JobSearch from "@/pages/JobSearch";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen p-6 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">
          🎯 Smart Job Finder
        </h1>

        {/* 示例按钮 - 使用 shadcn/ui */}
        {/* <Button variant="default">Click Me</Button> */}

        {/* 页面组件区域 */}
        <div className="mt-8">
          <JobSearch />
        </div>
      </div>
    </div>
  );
}

export default App;
