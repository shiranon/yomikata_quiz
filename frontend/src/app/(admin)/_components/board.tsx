export const Board = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex relative">
      <div className="border-4 border-border rounded-e-2xl rounded-b-2xl w-full h-[80vh] ml-[246px]">
        {children}
      </div>
    </div>
  )
}
