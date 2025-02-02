import { ProductManager } from "@/components/admin/ProductManager"
import { AdminLayout } from "@/components/admin/AdminLayout"

const Admin = () => {
  return (
    <AdminLayout>
      <div className="container py-8">
        <ProductManager />
      </div>
    </AdminLayout>
  )
}

export default Admin