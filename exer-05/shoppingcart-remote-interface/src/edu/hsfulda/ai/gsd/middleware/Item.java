/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.hsfulda.ai.gsd.middleware;

import java.io.Serializable;

/**
 *
 * @author mahbuburrahman
 */
public class Item implements Serializable {
    
    private final String name;
    private final Double unitPrice;
    private Integer quantity;

    private Item (String name, Double unitPrice) {
        this.name = name;
        this.unitPrice = unitPrice;
    }
    
    public static Item getInstance (final String name, final Double unitPrice) {
        return new Item(name, unitPrice);
    }
    
    public Item setQuantity (Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public String getName() {
        return name;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }
    
    public Double getTotalPrice () {
        return (quantity.doubleValue() * unitPrice);
    }
    
    @Override
    public String toString() {
        return "Item{" + "name=" + name + ", unitPrice=" + unitPrice + ", quantity=" + quantity + '}';
    }
}
