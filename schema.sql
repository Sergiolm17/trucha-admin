-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  region TEXT NOT NULL,
  purchase_frequency INTEGER DEFAULT 0,
  risk_score DECIMAL(4,2) DEFAULT 0,
  profitability DECIMAL(4,2) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Production table
CREATE TABLE IF NOT EXISTS production (
  id TEXT PRIMARY KEY,
  lot_name TEXT NOT NULL,
  product_name TEXT NOT NULL,
  size TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  capacity INTEGER NOT NULL,
  quantity_sold INTEGER DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('completado', 'en_proceso', 'retrasado')),
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  delay_days INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sales table
CREATE TABLE IF NOT EXISTS sales (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pagado', 'pendiente', 'vencido')),
  sale_date DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (product_id) REFERENCES production(id)
);

-- Receivables table
CREATE TABLE IF NOT EXISTS receivables (
  id TEXT PRIMARY KEY,
  sale_id TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATETIME NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pagado', 'vencido', 'pendiente')),
  days_overdue INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sale_id) REFERENCES sales(id)
);

-- Sizes table
CREATE TABLE IF NOT EXISTS sizes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL CHECK (name IN ('Pequeño', 'Mediano', 'Grande')),
  description TEXT,
  measurements TEXT NOT NULL,
  min_weight DECIMAL(6,2) NOT NULL,
  max_weight DECIMAL(6,2) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('error', 'warning', 'info')),
  is_active BOOLEAN DEFAULT true,
  requires_action BOOLEAN DEFAULT false,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Monthly metrics table
CREATE TABLE IF NOT EXISTS monthly_metrics (
  id TEXT PRIMARY KEY,
  month TEXT NOT NULL,
  year INTEGER NOT NULL,
  total_sales DECIMAL(12,2) NOT NULL DEFAULT 0,
  total_production INTEGER NOT NULL DEFAULT 0,
  production_sold INTEGER NOT NULL DEFAULT 0,
  production_capacity INTEGER NOT NULL DEFAULT 0,
  monthly_income DECIMAL(12,2) NOT NULL DEFAULT 0,
  operating_expenses DECIMAL(12,2) NOT NULL DEFAULT 0,
  active_clients INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(month, year)
);

-- Regional metrics table
CREATE TABLE IF NOT EXISTS regional_metrics (
  id TEXT PRIMARY KEY,
  region TEXT NOT NULL,
  month TEXT NOT NULL,
  year INTEGER NOT NULL,
  total_sales DECIMAL(12,2) NOT NULL DEFAULT 0,
  client_count INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(region, month, year)
);