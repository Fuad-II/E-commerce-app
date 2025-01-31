import { AdminLayout } from "@/components/admin/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Image, Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const NewProduct = () => {
  const [images, setImages] = useState<string[]>([])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newImages: string[] = []
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push(e.target.result.toString())
          if (newImages.length === files.length) {
            setImages(prev => [...prev, ...newImages])
          }
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission
    toast.success("Product created successfully!")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <Button type="submit" form="new-product-form">
            <Plus className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form id="new-product-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="Enter product name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter product description"
                      className="min-h-[200px]"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="rounded-lg object-cover w-full h-full"
                      />
                    </div>
                  ))}
                  <div className="border-2 border-dashed border-gray-200 rounded-lg aspect-square flex items-center justify-center">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      id="image-upload"
                      onChange={handleImageUpload}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <Image className="h-4 w-4 mr-2" />
                      Add Media
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="regular-price">Regular Price</Label>
                  <Input
                    id="regular-price"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sale-price">Sale Price</Label>
                  <Input
                    id="sale-price"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="Enter SKU" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default NewProduct