export const generateInvoiceHTMLTable = (categories: { productId: { name: any; size: any; discountPrice: number; }; quantity: number; }[], totalPrice: number) => {
    const tableHeader = `
      <tr>
        <th>Product</th>
        <th>Size</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
    `;
    
    const tableRows = categories.map((cart: { productId: { name: any; size: any; discountPrice: number; }; quantity: number; }) => `
      <tr>
        <td>${cart.productId.name}</td>
        <td>${cart.productId.size}</td>
        <td>${cart.quantity}</td>
        <td>$${(cart.quantity * cart.productId.discountPrice).toFixed(2)}</td>
      </tr>
    `).join('');
  
    const tableFooter = `
      <tr>
        <td colspan="3"><strong>Total</strong></td>
        <td><strong>$${totalPrice.toFixed(2)}</strong></td>
      </tr>
    `;
  
    return `
      <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        <thead>${tableHeader}</thead>
        <tbody>${tableRows}</tbody>
        <tfoot>${tableFooter}</tfoot>
      </table>
    `;
  };