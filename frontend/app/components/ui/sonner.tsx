"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      className="toaster group"
      icons={{
        success: null,
        error: null,
        info: null,
        warning: null,
        loading: null,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-center gap-3 w-[356px] p-4 rounded-lg bg-[#1c1917] text-[#faf7f5] border border-[#c2956a]/50 shadow-xl",
          title: "text-sm font-medium text-[#faf7f5]",
          description: "text-sm text-[#a8a29e]",
          actionButton:
            "ml-auto px-3 py-1.5 text-sm font-medium rounded-md bg-[#c2956a] text-[#0c0a09] hover:bg-[#c2956a]/90 transition-colors",
          cancelButton:
            "px-3 py-1.5 text-sm rounded-md bg-[#292524] text-[#a8a29e]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
