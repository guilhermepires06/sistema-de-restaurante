/*
  # Initial Schema Setup for Restaurant Management System

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `icon` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `image_url` (text)
      - `category_id` (uuid, foreign key)
      - `active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `tables`
      - `id` (uuid, primary key)
      - `number` (integer)
      - `seats` (integer)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `table_id` (uuid, foreign key, nullable)
      - `status` (text)
      - `total` (decimal)
      - `payment_status` (text)
      - `payment_method` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer)
      - `unit_price` (decimal)
      - `total_price` (decimal)
      - `notes` (text)
      - `created_at` (timestamp)
    
    - `reservations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `table_id` (uuid, foreign key)
      - `date` (date)
      - `time` (time)
      - `guests` (integer)
      - `status` (text)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add admin-specific policies
*/

-- Create tables
CREATE TABLE categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    icon text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    price decimal(10,2) NOT NULL,
    image_url text,
    category_id uuid REFERENCES categories(id),
    active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE tables (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    number integer NOT NULL UNIQUE,
    seats integer NOT NULL,
    status text DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'occupied')),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id),
    table_id uuid REFERENCES tables(id),
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'delivered', 'cancelled')),
    total decimal(10,2) NOT NULL,
    payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
    payment_method text CHECK (payment_method IN ('credit_card', 'debit_card', 'cash')),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE order_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid REFERENCES orders(id),
    product_id uuid REFERENCES products(id),
    quantity integer NOT NULL,
    unit_price decimal(10,2) NOT NULL,
    total_price decimal(10,2) NOT NULL,
    notes text,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE reservations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id),
    table_id uuid REFERENCES tables(id),
    date date NOT NULL,
    time time NOT NULL,
    guests integer NOT NULL,
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    notes text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access" ON categories FOR SELECT TO PUBLIC;
CREATE POLICY "Public read access" ON products FOR SELECT TO PUBLIC;
CREATE POLICY "Public read access" ON tables FOR SELECT TO PUBLIC;

-- Orders policies
CREATE POLICY "Users can read own orders"
ON orders FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
ON orders FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can read own order items"
ON order_items FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM orders
        WHERE orders.id = order_items.order_id
        AND orders.user_id = auth.uid()
    )
);

-- Reservations policies
CREATE POLICY "Users can read own reservations"
ON reservations FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create reservations"
ON reservations FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create admin role
CREATE ROLE admin;

-- Admin policies
CREATE POLICY "Admin full access" ON categories FOR ALL TO admin USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access" ON products FOR ALL TO admin USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access" ON tables FOR ALL TO admin USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access" ON orders FOR ALL TO admin USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access" ON order_items FOR ALL TO admin USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access" ON reservations FOR ALL TO admin USING (true) WITH CHECK (true);

-- Create functions
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_tables_updated_at
    BEFORE UPDATE ON tables
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_reservations_updated_at
    BEFORE UPDATE ON reservations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();