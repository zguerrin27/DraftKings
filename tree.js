class Employee {
  constructor(id, name, managerId){
    this.id = id;
    this.name = name;
    this.managerId = managerId;
    this.children = [];
  }
}

class OrgChart {
  constructor(){
    let node = new Employee(-1, "ROOT", null);
    this.root = node;
  }

  add(id, name, managerId){
    let root = this.root;
    let newEmp = new Employee(id, name, managerId)
    let allEmployeeIds = this.getAllIds();

    if(!allEmployeeIds.includes(newEmp.managerId)){
      newEmp.managerId = -1
    }
    
    if( newEmp.managerId === -1){
      root.children.push(newEmp)
    } else {
      if(allEmployeeIds.includes(newEmp.id)){
        console.log(newEmp.id, ": Employee id already exists")
        return
      } else {
        let managerNode = this.DFS(root, newEmp.managerId)
        managerNode.children.push(newEmp)
      }
    }
  }

  move(id, newManagerId){
    let root = this.root;
    let emp = this.DFS(root, id)
    let newManager = this.DFS(root, newManagerId)
    
    if(!emp || !newManager){
      console.log("Employee from move attempt", emp)
      console.log("manager from move attempt: ", newManager)
      return null
    } else {
      let empOldManager = this.DFS(root, emp.managerId)
      emp.managerId = newManagerId;
      newManager.children.push(emp)
      for(let i = 0; i < empOldManager.children.length; i++){
        if(emp.id === empOldManager.children[i].id){
          empOldManager.children.splice(i, 1)
        }
      }
    }
  }

  remove(id){
    let root = this.root;
    let emp = this.DFS(root, id)
    let manager = this.DFS(root, emp.managerId)
    let managerChildren = manager.children;

    if(!emp){
      return null
    } else {
      for(const child of emp.children){
        child.managerId = manager.id
        managerChildren.push(child)
      }
      for(let i = 0; i < manager.children.length; i++){
        if(emp.id === managerChildren[i].id){
          managerChildren.splice(i, 1)
        }
      }
    }
  }

  count(id){                                // BFS
    let root = this.root;
    let startingNode = this.DFS(root, id)
    let array = []
    let queue = [startingNode]

    while(queue.length > 0){
      let current = queue.shift()
      array.push(current.id)
      for(const child of current.children){
        queue.push(child)
      }
    }
    return array.length -1   // does this need to be a console.log()??? 
  }

  print(){
    let root = this.root;
    for(const child of root.children){
      this.printTreeBranch(child)
    }
  }

  printTreeBranch(node){
    let indent = "";
    let delimiter = "delimiter";
    let queue = [node]
    queue.push(delimiter)
    while(queue.length > 0){
      let current = queue.shift()
      if(current !== delimiter){
        console.log(indent + current.name + " " + "[" + current.id + "]")
        for(const child of current.children){
          queue.push(child)
        }
      } else {
        indent += "  "
        if(queue.length === 0)break
        queue.push(delimiter)
      }
    }
  }
 
  DFS(node, id){
    if(node.id === id){
      return node
    } else {
      for(const child of node.children){
        const found = this.DFS(child, id);
        if(found) return found
      }
      return null
    }
  }
  
  
  getAllIds(array = []){                        //BFS
    let root = this.root;
    let queue = [root]
    while(queue.length > 0){
      let current = queue.shift()
      array.push(current.id)
      for(const child of current.children){
        queue.push(child)
      }
    }
    return array
  }

}


let orgChart = new OrgChart();

// add(id, name, managerId)
// orgChart.add(18, "zach - l1", -1)
// orgChart.add(10, "Brian - l2", 18)
// orgChart.add(27, "Karyn - l1", -1)
// orgChart.add(7, "Tom - l2", 18)
// orgChart.add(4, "Steve - l2", 18)
// orgChart.add(2, "Ryan - l1", -1)
// orgChart.add(19, "Bri - l2", 2)
// orgChart.add(24, "Jon - l2", 2)
// orgChart.add(242, "Bill - l2", 18)
// orgChart.add(88, "Jess - l3", 7)

// orgChart.add(88, "Toni", 7) // should throw error: id already utilzied 
// orgChart.move(200, 18) // should not move 200 is invalid employee
// orgChart.move(10, 200) // should not move 200 is invalid manager

// orgChart.print()  // includes emp 19 in emp 2 children
// orgChart.move(19, 18) // move emp 19 to emp 18 children, this also removes emp 19 from emp 2 children
// // orgChart.remove(18)
// console.log("========================")
// orgChart.print()   // confirm emp 19 now belongs to emp 18 children, no longer in emp 2 children
// console.log("========================")
// orgChart.add(33, "Diesel", 18)
// orgChart.print() // should have emp 33 added behind emp 19 in the children of emp 18

// orgChart.add(44, "Bailey", 200)
// orgChart.print() // this should show emp 44 in the -1 emp children


orgChart.add(10, "Sharilyn Grubber", -1)
orgChart.add(7, "Denice Mattice", 10)
orgChart.add(3, "Lawana Futrell", -1)
orgChart.add(34, "Lissette Gorney", 7)
orgChart.add(5, "Lan Puls", 3)
orgChart.print()
console.log("===========")
// orgChart.add(5, "Lan Puls", 3) // does not get added
// orgChart.add(34, "Lissette Gorney", 7) // does not get added

// orgChart.print()  // shows list correctly
// orgChart.remove(10)  // remove emp 10
// orgChart.print()
// console.log("===========")
// orgChart.add(180, "Tommy-Lee", 45)
// orgChart.print()    // now emp 3 and children come before children of former employee 10, pretty sure it calls this out in directions
// console.log("===========")
// orgChart.move(180, 7)
// orgChart.print()
// console.log("===========")
orgChart.add(789, "Rick", 7)
orgChart.add(787, "Mohan", 10)
orgChart.print()
console.log("===========")

orgChart.add(3455, "Spencer", 10)
orgChart.add(4444, "Ava", 10)
orgChart.print()
console.log("===========")
orgChart.add(4, "Jenny", 7)
orgChart.print()
console.log("===========")

// console.log(orgChart.count(-1))
