CREATE OR REPLACE FUNCTION calculate_order_subtotal()
RETURNS TRIGGER AS $$
BEGIN
  NEW.subtotal := NEW.quantity * NEW.price;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER order_product_subtotal_trigger
BEFORE INSERT OR UPDATE ON "order_product"
FOR EACH ROW EXECUTE FUNCTION calculate_order_subtotal();